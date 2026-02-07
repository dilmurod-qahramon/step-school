/**
 * Google Apps Script for Step School Booking System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire code
 * 4. Replace SPREADSHEET_ID with your spreadsheet ID: 1krgPRbY2WPguupYHFUvGa5mxS4tseXKM2h-W6qzkHeQ
 * 5. Deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and update it in src/hooks/useBookingSlots.ts
 * 
 * SPREADSHEET STRUCTURE:
 * The script will automatically create a sheet named "Bookings" with columns:
 * | ID | Teacher ID | Teacher Name | Date | Time | Student Name | Phone | Comments | Timestamp |
 */

const SPREADSHEET_ID = '1krgPRbY2WPguupYHFUvGa5mxS4tseXKM2h-W6qzkHeQ';
const SHEET_NAME = 'Bookings';

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getBookings') {
    return getBookings(e.parameter.teacherId);
  }
  
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: 'Invalid action' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'createBooking') {
      return createBooking(data);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: 'Invalid action' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getBookings(teacherId) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['ID', 'Teacher ID', 'Teacher Name', 'Date', 'Time', 'Student Name', 'Phone', 'Comments', 'Timestamp']);
    }
    
    const data = sheet.getDataRange().getValues();
    const bookings = [];
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Filter by teacher if specified
      if (!teacherId || row[1] === teacherId) {
        bookings.push({
          id: row[0],
          teacherId: row[1],
          teacherName: row[2],
          date: row[3],
          time: row[4],
          name: row[5],
          phone: row[6],
          comments: row[7],
          timestamp: row[8]
        });
      }
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, bookings: bookings })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function createBooking(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['ID', 'Teacher ID', 'Teacher Name', 'Date', 'Time', 'Student Name', 'Phone', 'Comments', 'Timestamp']);
    }
    
    // Check if slot is already booked
    const existingData = sheet.getDataRange().getValues();
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][1] === data.teacherId && 
          existingData[i][3] === data.date && 
          existingData[i][4] === data.time) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: 'Bu vaqt allaqachon band qilingan' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Generate unique ID
    const id = Utilities.getUuid();
    
    // Add new booking
    sheet.appendRow([
      id,
      data.teacherId,
      data.teacherName,
      data.date,
      data.time,
      data.name,
      data.phone || '',
      data.comments || '',
      data.timestamp || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, id: id })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

import {sendIncidentAlert} from '../services/whatsappService.js'

const testIncident ={
    student_name: "Rejoice Joicey Chibuzor",
    student_id: "2145113174274",
    latitude: "262383",
    longitude : "2374242",
    description: "Bestie I cherish. Thank you for what you Said. I appreciate you",

}
sendIncidentAlert(testIncident);
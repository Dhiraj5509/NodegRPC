// get the grpc module
const grpc = require('grpc') ; 
const uuid = require('./node_modules/uuid/dist/v1') ; 

// load the .proto file 
const notesProto = grpc.load('notes.proto') ; 

// create a grpc server 
const server = new grpc.Server()
// data
const notes = [
    { note_id: '1', title: 'Note 1', content: 'Content 1'},
    { note_id: '2', title: 'Note 2', content: 'Content 2'}
];


// add the service 
server.addService(notesProto.NoteService.service, {
    list: (parameters, callback) => {
        callback(null, notes)
    },
    insert : (call , callback) =>{
        let note = call.request ;
        if(isNotePresent(note)){
            callback("Duplicate entry",null) ; 
        } 
        else
        {
            notes.push(note) ;
            callback(null , notes) ;  
        }
    } 
    

})
// bind the server on ..ip and ...port number 
// bind method returns the port number on which the grpc server is binded. 
// this will bind asyncronously 
let number = server.bind('127.0.0.1:4999', grpc.ServerCredentials.createInsecure()) ; 

console.log('grpc server binded on port number' , number);

// start the server
server.start() ; 

function isNotePresent(note)
{
    for(let n of notes){
        if(n.note_id == note.note_id)
        {
            return true ; 
        }
    }
    return false ; 
}


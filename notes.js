// get the grpc client
const client = require('./client') ;

let choice = 2; 

if(choice==1)
{
    client.list({}, (error, notes) => {
        if (!error) {
            console.log('successfully fetch List notes')
            console.log(notes)
        } else {
            console.error(error)
        }
    }) ; 
}
else if(choice==2){
    client.insert( { note_id: '4',title: 'Note 4', content: 'Content 1' }, (error , notes)=>{
        if(!error){
            console.log("inserted successfully");
            console.log(notes);
        }
        else
        {
            console.log('cant insert the data , might be duplicate data');
        }
    }) ; 
}



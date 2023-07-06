import { Component } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
 
   profile = 'IR'

   constructor( public firestore: Firestore){
  }
  public data: any = [];
  taskProperty: string[] = [
    'id',
     'Name', 
     'Status', 
     'Difficulty',
     'Level',
      'StartDate',
      'DueDate'
  ]

  displayTask: string[] = ['id', 'Name', 'Status', 'Difficulty','Level', 'StartDate','DueDate'];

  gettData(id: string){
    const addData = collection(this.firestore, 'Task', id);
    getDocs(addData)
    .then((respond) => {
      alert('Data Gotten')
      this.data = [...respond.docs.map((item) =>{
        return{ ...item.data(), id: item.id}})]
    })
  }
  getData(){
    const addData = collection(this.firestore, 'Task');
    getDocs(addData)
    .then((respond) => {
      // alert('Data Gotten')
      this.data = [...respond.docs.map((item) =>{
        return{ ...item.data(), id: item.id}})]
    })
  }
  deleteTask(id: string){
    const dataDelete = doc(this.firestore, 'Task', id);
    deleteDoc(dataDelete) 
     .then(()=>{
      window.location.reload()
      alert('Task Deleted')
      this.getData
     })
     .catch((err)=>{
       alert(err)
     })
  }
   
}

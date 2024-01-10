import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage'
@Injectable({
  providedIn: 'root'
})
export class NewpostService {

  constructor(private afs:AngularFirestore,private toastr:ToastrService) { }
  saveData(data:any){
    this.afs.collection('postform').add(data).then(docRef=>{
      console.log(docRef);
      this.toastr.success('Data inserted successfully');
    })
    .catch(err=> {console.log(err)})

  }
}

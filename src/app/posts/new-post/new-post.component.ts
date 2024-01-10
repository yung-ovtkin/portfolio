import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
[x: string]: any;
  categoryArray: Array<any> = [];
  permalink: string ='';
  // imgSrc: any ='assets/placeholder-image.png';
  // selectedimg: any;
  postForm!: FormGroup ;
title: any;
constructor(private categoryService: CategoriesService,private toastr: ToastrService,private afs:AngularFirestore, private formBuilder: FormBuilder){
 
}
answer:any ='';

ngOnInit(): void {
  this.categoryService.loadData().subscribe((val)=>{
    console.log(val);
    this.categoryArray = val;
  })
  this.postForm = this.formBuilder.group({
    title: ['',[Validators.required,Validators.minLength(10)]],
    permalink: ['',[Validators.required]],
    excerpt: ['',[Validators.required, Validators.minLength(5)]],
    // postImg: [null,[Validators.required]],
    content: ['',[Validators.required]],
  })
}
onSubmit(){
  if(this.postForm.valid){
    let formData = this.postForm.value;
    this.afs.collection('postforms').add(formData).then(()=>{
      console.log('data inserted successfully');
      this.toastr.success('Data inserted successfully');
      this.postForm.reset()
    })
    .catch(error => {
      console.error('Error adding data to Firestore:', error);
    });

    }
    // let formData = this.formData.value;
  }
  // let categoryData: Category ={
  //   category: formData.value.category,
  // }
  // if (this.formStatus == 'Add'){
  //   this.categoryService.saveData(categoryData);
  //   formData.reset();}
get fc(){
  return this.postForm.controls;
}

onTitleChanged($event: any){
  const title = $event.target.value;
  this.permalink = title.replace(/\s/g,'-');
  console.log(this.permalink);
}
  showPreview($event:any){
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedimg = $event.target.files[0];
  }


}
function showPreview($event: any, any: any) {
  throw new Error('Function not implemented.');
}


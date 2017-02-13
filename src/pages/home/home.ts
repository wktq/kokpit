import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.tasks = af.database.list('/tasks');
  }

  showOptions(taskId, taskTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '操作を選択',
      buttons: [
        {
          text: '削除する',
          role: 'destructive',
          handler: () => {
            this.removeTask(taskId);
          },
          icon: 'trash',
          cssClass: 'red'
        },{
          text: '編集する',
          handler: () => {
            this.updateTask(taskId, taskTitle);
          },
          icon: 'create'
        },{
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeTask(taskId: string){
    this.tasks.remove(taskId);
  }

  addTask(){
    let prompt = this.alertCtrl.create({
      title: 'タスクを追加',
      message: "新しくタスクを追加",
      inputs: [
        {
          name: 'タスク名',
          placeholder: '例）issueを確認する'
        }
      ],
      buttons: [
        {
          text: 'キャンセル',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '追加',
          handler: data => {
            this.tasks.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateTask(taskId, taskTitle){
    let prompt = this.alertCtrl.create({
      title: 'Task Name',
      message: "Update the name for this task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: taskTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.tasks.update(taskId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}

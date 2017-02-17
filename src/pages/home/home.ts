import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  projects: FirebaseListObservable<any>;
  goals: FirebaseListObservable<any>;
  tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.goals = af.database.list('/projects');
    this.goals = af.database.list('/goals');
    this.goals = af.database.list('/tasks');
  }

  showOptions(goalId, goalTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '操作を選択',
      buttons: [
        {
          text: '削除する',
          role: 'destructive',
          handler: () => {
            this.removeGoal(goalId);
          },
          icon: 'trash',
          cssClass: 'red'
        },{
          text: '編集する',
          handler: () => {
            this.updateGoal(goalId, goalTitle);
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

  removeGoal(goalId: string){
    this.goals.remove(goalId);
  }

  addGoal(){
    let prompt = this.alertCtrl.create({
      title: 'ゴールを追加',
      message: "タスクをグループ化するゴールを入力してください。",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            this.goals.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateGoal(goalId, goalTitle){
    let prompt = this.alertCtrl.create({
      title: 'Goal Name',
      message: "Update the name for this goal",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: goalTitle
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
            this.goals.update(goalId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}

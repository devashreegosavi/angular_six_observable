import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private firstObsSubscription : Subscription;
  private count :any;
  constructor(){

  }
  ngOnInit() {

    //////// below id in built observable code ( built in interval )////
    /*this.firstObsSubscription = interval(1000).subscribe(
      count => {
        console.log(count);
      }
    );

    ////////// deprecated code ////////////// 
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });*/

    /////////////////////////////////////////

    ///// below is custom observable code ////////////////
    const customIntervalObservable = new Observable<any>((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }

        count++;
      }, 1000);
      }
    );


    this.firstObsSubscription = customIntervalObservable.subscribe( data => {
      console.log(data);
    },error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed');
    }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}

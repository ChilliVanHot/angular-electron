import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MenusEmpty, MenuItem, MenusReply } from '../../generated/menus.pb';
import { MenusClient } from '../../generated/menus.pbsc';


@Component({
  selector: 'app-grpc-demo',
  templateUrl: './grpc-demo.component.html',
  styleUrls: ['./grpc-demo.component.scss']
})
export class GrpcDemoComponent implements OnInit, OnDestroy {
    //GRPC
    //grpcClient!: Request;
    //messages: any[] = [];
    //
    result: MenuItem[] = [];
    resulStream: MenuItem[] = [];
    getMenusSubscription: any;

    getMenusStreamSubscriptionData: any;
    getMenusStreamSubscription: Subject<MenuItem> = new Subject<MenuItem>();

    sub: Subject<MenuItem>;


  constructor(public client: MenusClient) { }

  ngOnInit() {


  }
  ngOnDestroy() {
    //this.getMenusSubscription.unsubscribe();
    //this.getMenusStreamSubscription.unsubscribe();
    this.reset();
  }

  startUnary() {
    this.getMenusSubscription = this.client.getMenus(new MenusEmpty()).subscribe((res) => {
        this.result = res.menus;
        console.log('result : ' + JSON.stringify(this.result));
    });
  }
  startStream() {
    // this.getMenusStreamSubscription.next(this.getMenusStreamSubscriptionData);
    // this.getMenusStreamSubscriptionData = this.client.getMenusStream(new MenusEmpty()).subscribe((res) => {
    //     this.resulStream.push(res);
    //     console.log('name : ' + JSON.stringify(res.name));
    // });
    // console.log("Starting streaming call");
    // this.sub = this.client.getMenusStream(new MenusEmpty()).subscribe(
    //     response => console.log(JSON.stringify(response)),
    //     error => console.log('Error : ' + error),
    //     () => console.log('Stream complete'),
    //     );
    console.log('Starting streaming call');

    // this.sub = this.client.getMenusStream(new MenusEmpty()).subscribe({

    //     next: response => console.log('Response : ' + JSON.stringify(response.name)),
    //     error: message => console.log('Error message : ' + message),
    //     complete: () => console.log('Streaming call complete')
    // });

    this.client.getMenusStream(new MenusEmpty()).subscribe(

        response => console.log('.' + JSON.stringify(response) + '.')

    );


    //this.sub = this.client.getMenusStream(new MenusEmpty()).subscribe(response => console.log(response.name));


  }
  reset() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }
}

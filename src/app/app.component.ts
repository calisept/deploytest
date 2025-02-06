import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  updateAvailable = false;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.versionUpdates.
    pipe(filter(
      (event): event is VersionReadyEvent => event.type === 'VERSION_READY'
    ))
    .subscribe(() => {
      if (confirm("New version available. Load New Version?")) {
        window.location.reload();
      }
      // const snack = snackBar.open('New version available', 'Reload');
      // snack.onAction().subscribe(() => {
      //   swUpdate.activateUpdate().then(() => window.location.reload());
      // });
    });
  }

  ngOnInit() {
    console.log("what is THIS", this.swUpdate.isEnabled);
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.checkForUpdate().then((haveUpdate) => {
    //   console.log('Update available: ', haveUpdate);
    //   this.updateAvailable = haveUpdate;
    //   });

    //   // Check for updates every 5 seconds
    //   setInterval(() => {
    //   this.swUpdate.checkForUpdate().then((haveUpdate) => {
    //     console.log('Periodic update check: ', haveUpdate);
    //     this.updateAvailable = haveUpdate;
        
    //   });
    //   }, 5 * 1000); // 5 seconds in milliseconds
    // }
  }

  reload() {
    window.location.reload();
  }
}
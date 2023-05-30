import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'sys-log-execute-detail',
  templateUrl: './log-execute-detail.component.html',
  styleUrls: ['./log-execute-detail.component.scss']
})
export class LogExecuteDetailComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  constructor(
    public locationService: LocationService,
  ) { }

  ngOnInit(): void { }
}

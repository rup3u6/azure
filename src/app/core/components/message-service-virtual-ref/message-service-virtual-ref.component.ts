import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-service-virtual-ref',
  templateUrl: './message-service-virtual-ref.component.html',
  styleUrls: ['./message-service-virtual-ref.component.scss'],
})
export class MessageServiceVirtualRefComponent implements AfterViewInit {
  @ViewChild('tplContent') tplContentTemplateRef!: TemplateRef<any>;

  constructor(private messageService: MessageService) {}

  ngAfterViewInit(): void {
    this.messageService.initTemplate('tplContent', this.tplContentTemplateRef);
  }
}

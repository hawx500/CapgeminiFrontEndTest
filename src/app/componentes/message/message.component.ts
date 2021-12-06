import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EnumMessage, IDataMessage } from 'src/app/models/IMessageData';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  public textOk: string;

  constructor(
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMessage: IDataMessage) {
            
      this.textOk = (dataMessage.menssageType == EnumMessage.confirmation) ? 'Confirmation' : 'Ok';
  }

  giveAnswer(_answer: boolean): void {
    this.dialogRef.close(_answer);
  }

  public get showCancel(): boolean {
    return (this.dataMessage.menssageType == EnumMessage.confirmation);
  }

  public get isError(): boolean {
    return (this.dataMessage.menssageType == EnumMessage.error);
  }

}

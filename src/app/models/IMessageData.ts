export class IDataMessage {
    title: string;
    message: string;
    menssageType: EnumMessage;

    constructor( _title: string, _message: string, _menssageType: EnumMessage = EnumMessage.informative) {
       this.title = _title;
       this.message = _message;
       this.menssageType = _menssageType;
    }
}

export enum EnumMessage {
    informative = 0,
    confirmation,
    error
}
export class PartyDetails {
  public id: string;
  public fullName: string;
  public address: string;
  public mobileNo: string;
  public date: string;
  public time: string;
  public qrCodeData: string; // QR code content
  public attended: boolean; // New field to track attendance

  constructor(
    fullName: string,
    id: string,
    address: string,
    mobileNo: string,
    date: string,
    time: string,
    qrCodeData: string = '',
    attended: boolean = false
  ) {
    this.fullName = fullName;
    this.id = id;
    this.address = address;
    this.mobileNo = mobileNo;
    this.date = date;
    this.time = time;
    this.qrCodeData = qrCodeData;
    this.attended = attended;
  }
}
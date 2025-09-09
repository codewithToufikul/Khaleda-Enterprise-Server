// interfaces/rfq.interface.ts
import { Types } from "mongoose";

export interface IRfq {
  buyer: {
    company?: string;
    contactPerson?: string;
    country?: string;
    email: string;
    phone: string;
  };
  shipment?: {
    incoterm?: string;
    preferredPort?: string;
    deliveryWindow?: string;
  };
  lineItems: {
    productId?: Types.ObjectId;
    productName?: string;
    quantity?: number;
    unit?: string;
    packaging?: string;
    preferredShipmentDate?: Date;
    remarks?: string;
  }[];
  attachments?: {
    filename?: string;
    url?: string;
    mimeType?: string;
    size?: number;
  }[];
  status: "Pending" | "In Review" | "Quoted" | "Closed";
  createdAt?: Date;
}

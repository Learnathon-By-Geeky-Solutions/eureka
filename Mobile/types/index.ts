// image kit auth type
export type ImageKitAuthParams = {
  token: string;
  expire: string;
  signature: string;
  publicKey: string;
};

export type ImageKitImageFile = {
  uri: string;
  fileName?: string;
  type?: string;
};

export type uploadToImageKitProps = {
  file: ImageKitImageFile;
  authParams: ImageKitAuthParams;
  fileAddition: string;
};

export type ImageKitUploadResponse = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  [key: string]: any;
};

export type ImageType = {
  uri: string;
  hashedURI: string;
};

export type BilType = {
  basePrice?: number;
  price?: number;
  weight?: number;
  extraWeight?: number;
  extraCharge?: number;
};

export type PostStatus = "pending" | "in-processing" | "completed" | "cancel";

export type Category = "delivery" | "errand";

export type Locations = {
  address: string; // todo change address in "Label"
  lat: number;
  lon: number;
  city: string;
  area: string;
};
export interface CreatePostFormState {
  postID: string;
  userID: number;
  title: string;
  description: string;
  images: ImageType[]; // local only
  dropLocation: string |"";
  pickupLocation: string | "";
  weight: number;
  status: PostStatus;
  category: Category | "delivery";
  createAt: string;
  updateAt: string;
  price: number;
  bilEstimate: BilType;
}

export type uploadedImageType ={
    url:string,
    fileId:string,
    thumbnail?:string,
}
export interface CreatePostPayload extends Omit<CreatePostFormState, "images">{
    images: uploadedImageType[];
}

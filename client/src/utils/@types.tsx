
import React, { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export interface REVIEW {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map(arg0: (review: any) => JSX.Element): React.ReactNode;
  length: ReactNode;
    _id:string,
    user:string;
     name:string;
     rating:string;
     comment:string;

}
export interface ITEM {
  length: ReactNode;
    _id:string,
    title:string;
     description:string;
     category:string;
     price:number,
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     reviews:REVIEW;
     numReviews:number;
     discount:number;
     unit:number;
  quantity:number;
     image:string;
     trending:string;
      recommended:string;
     topfeatured:string;
     topdeals:string;
     date_added:string;
}

export interface CATEGORY {
  title: string,
image:string,
 item:ITEM[]
}

export interface ADDRESSITEM {
  owner : string;
    firstname: string;
    lastname:string;
    mobile: string;
    mobile2:  string;
    address: string;
    nation: string;
    region: string;
    postalcode: string;
    province: string;
    ordernote: string;
}

export interface CARTITEM {
    id:string,
    itemId:string;
    title:string;
    image:string;
    quantity:number;
    price:number;
}

export interface ORDERITEM {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    length: ReactNode;
    id:string,
    itemId:string;
    title:string;
    image:string;
    quantity:number;
    price:number;
}




export interface VIEWITEM {
  id:string,
  title:string;
  image:string;
  price:number;
  discount:number;
}
export interface USER {
  _id: string,
  email: string,
  firstname:string,
  lastname:string,
  token:string,
  username: string,
  register_date: string,
  role:string,
  __v: number
}



export type viewType = {
  id:string,
  owner:string
  vieweditems:VIEWITEM[]
};

export type cartType = {
    cartItems:CARTITEM[],
    addToCart:(arg0: ITEM  ) => void;
    addCart:(arg0: ORDERITEM  ) => void;
    clearCart:() => void;
    getCartTotal:() => string;
    deleteFromCart:(arg0: CARTITEM) => void;
    addQty:(arg0: CARTITEM) => void;
    reduceQty: (arg0: CARTITEM) => void;
    cartMessage:string,
  };

  export interface RENDER {
    days:number,
     hours:number,
      minutes:number,
       seconds:number,
        completed:boolean,

  }

  export type renderType = {
    render: (arg0: RENDER) => void
  }
  export interface CURRENCY {
    currency:string,
  }
  export type favoriteType = {
    favoriteItems:ITEM,
    deleteFromfavorite:(arg0: ITEM) => void,
    addTofavorite:(arg0: ITEM) => void,
    state:CURRENCY
    setState:React.Dispatch<React.SetStateAction<CURRENCY>>
  };



  export interface ORDER {
    _id:string,
    owner:USER,
    items:ORDERITEM,
    giftwrapper:number;
    deliveryfee:number;
    bill:number;
    address:string,
    paymentid:number;
    payment:boolean;
    isDelivered:boolean;
    createdAt: string;
    updatedAt:string;
    deliveredAt:string

    }
    
    export interface CART {
      _id:string,
      owner:USER,
      items:CARTITEM,
      bill:number;
createdAt: string;
      }
      

  export type orderType = {
    Order:ORDER[];
      existingOrder:ORDER[];
      setOrderInvoice:React.Dispatch<React.SetStateAction<never[]>>
      orderItems:ORDERITEM[]
  };



  
  export type itemType = {
    items:ITEM[],
    searchItems:ITEM[];
    searchQuery:string;
    setSearchItems:React.Dispatch<React.SetStateAction<never[]>>;
    setSearchQuery:React.Dispatch<React.SetStateAction<string>>;
    addRelatedItem:(arg0: ITEM) => void;
    addViewedItem:(arg0: ITEM) => void;
    
  };



  
  export type authType = {
    Logout:() => void;
    isAuthenticated:boolean;
    updateUser:USER | null;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;

  };

  

  export type addressType = {
    destination:ADDRESSITEM;
  };

  export type checkOutType = {
    stripePromise:string;
    clientSecret:string;
    setClientSecret:React.Dispatch<React.SetStateAction<string>>;
    setStripePromise:React.Dispatch<React.SetStateAction<string>>;
    getsecret:() => void;
    gift:number,
    setGift:React.Dispatch<React.SetStateAction<number>>;
    shipping:number,
    setShipping:React.Dispatch<React.SetStateAction<number>>;
  };



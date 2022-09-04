import PN from "persian-number";
import * as moment from 'jalali-moment';


export const DATA =  [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: 259,
      },
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {
        rate: 4.7,
        count: 500,
      },
      
    },
  ]

  export const FA_DATA = [
    {
      "id": 2,
      'date': PN.convertEnToPe(moment( new Date("2010-11-29"), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')),
      "username": "KhQIAFuE",
      "email": "KhQIAFuE@gmail.com",
      "first_name": "پریز",
      "last_name": "پرکلاغیی",
      "full_name": "پریز پرکلاغیی",
      "gender": "زن",
      "phone_number": PN.convertEnToPe("09306704498"),
      "avatar": "https://fake.cafepy.ir/static/images/female.jpg",
      "address": {
        "id": 71,
        "full_address": PN.convertEnToPe("فارس - فارس - زرقان - خیابان پرستار - پلاک 810")
      }
    },
    {
      "id": 3,
      'date' : PN.convertEnToPe(moment( new Date("2021-10-05"), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')),
      "username": "uXZmHYSIgRO",
      "email": "uXZmHYSIgRO@gmail.com",
      "first_name": "آصف علی",
      "last_name": "سارای",
      "full_name": "آصف علی سارای",
      "gender": "مرد",
      "phone_number": PN.convertEnToPe("09148997858") ,
      "avatar": "https://fake.cafepy.ir/static/images/male.jpg",
      "address": {
        "id": 161,
        "full_address": PN.convertEnToPe("لرستان - لرستان - الیگودرز - خیابان اتوبوس - پلاک 561")
      }
    },
    {
      "id": 4,
      'date' : PN.convertEnToPe(moment( new Date("2004-07-10"), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')),
      "username": "YwdXtmfvbzO",
      "email": "YwdXtmfvbzO@gmail.com",
      "first_name": "مصطفیی",
      "last_name": "چلوی",
      "full_name": "مصطفیی چلوی",
      "gender": "مرد",
      "phone_number":  PN.convertEnToPe("09989751757"),
      "avatar": "https://fake.cafepy.ir/static/images/male.jpg",
      "address": {
        "id": 63,
        "full_address": PN.convertEnToPe("آذربایجان غربی - آذربایجان غربی - چالدران - خیابان ملک - پلاک 486")
      }
    },
  ]
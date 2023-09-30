import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Spinner from '../spinner/Spinner';
import axiosInstance from '../../utils/axiosInstance';

//tostify
const notifyError = (err: string) =>
  toast.error(err, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
const notifySuccess = () =>
  toast.success("درخواست با موفقیت انجام شد", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });

type Props = {
  setIsModalOpen: any;
  isModalOpen: boolean;
  setBookName: any;
  setAuthor: any;
  setTranslator: any;
  setPublisher: any;
  setShabak: any;
  setNumPages: any;
  setImageLink: any;
}

const BarcodeModal = ({ setIsModalOpen, isModalOpen, setBookName, setAuthor, setTranslator, setPublisher, setShabak, setNumPages, setImageLink }: Props) => {
    const [barcodeScan, setBarcodeScan] = useState("No Barcode Scanned");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (barcodeScan !== "No Barcode Scanned") {
            setLoading(true);
            axiosInstance.post('/home/find-book-by-shabak', { shabak: barcodeScan })
            .then((res) => {
                const data = res.data;
                console.log({barcoderes: data})
                if (Object.keys(data).length < 2) {
                    notifyError("کتاب مورد نظر یافت نشد")
                    setLoading(false);
                } else {
                    if (data.bookName) {
                        setBookName(data.bookName)
                    }
                    if (data.authorName) {
                        setAuthor([{ athor: data.authorName }]) 
                    }
                    if (data.publisherName) {
                        setPublisher(data.publisherName)
                    }
                    if (data.numberOfPages) {
                        setNumPages(data.numberOfPages)
                    }
                    if (data.translatorName) {
                        setTranslator([{ translator: data.shabak }])
                    }
                    if (data.image && data.image !== "") {
                        setImageLink(data.image);
                    }
                    setShabak(barcodeScan)
                    setIsModalOpen(false);
                    setLoading(false);
                }
                
            })
            .catch((err) => {
                setLoading(false);
                notifyError("در خواندن بارکد مشکلی پیش امد ")
            })
        }
    }, [barcodeScan])

    useEffect(() => {
        setBarcodeScan("No Barcode Scanned")
    }, [isModalOpen])

  return (
    <>
      {isModalOpen && (
        <div
          className={`w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <form
            className="relative w-96 h-[40vh] rounded bg-white flex flex-col p-10  justify-around items-center"
          >
            {loading ? (
            <>
                <Spinner />
            </>) : (
                <BarcodeScannerComponent
                width={600}
                height={700}
                onUpdate={(err, result) => {
                if (result) setBarcodeScan(result["text"]);
                else return;
                }}
            />
            )}
            
            <p>Code: {barcodeScan}</p>
          </form>
        </div>
        
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />
    </>
  )
}

export default BarcodeModal
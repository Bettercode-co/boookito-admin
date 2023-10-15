import React, { CSSProperties, useState } from 'react';

import { useCSVReader } from 'react-papaparse';
import axiosInstance from '../../utils/axiosInstance';
import { getCookie } from 'cookies-next';


const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

export default function CSVReader() {
    const [logs, setLogs] = useState([]);
  const { CSVReader } = useCSVReader();
  const [error,setError]=useState([])
  const [success,setSuccess]=useState(false)
  
  const token = getCookie("accessToken");
  const allUsers=[]

 async function handleNewUser(user:any){
    const response=await axiosInstance.post('admin/createuser',user,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res=>{
        return res.data
    })
    return response
  }

  return <>
  
  <CSVReader
      onUploadAccepted={(results: any) => {


        const arrayResults=results.data
        arrayResults.map((value,index)=>{
            //Anids 0 code meli
            //Andis 1 firstname
            //andis 2 lastname
            //andis 3 phoneNumber
            //andis 4 StudentId 
            //andis 5 level 
            

  const newData={username:value[0],studentId:value[4],firstname:value[1],lastName:value[2],password:value[4],phoneNumber:value[3],level:value[5],  ruleBase:"STUDENT",       }
            
           allUsers.push(newData)


            
        })
        const fuckingUser=async()=>{
            for (let index = 1; index < allUsers.length-1; index++) {

                const newUser= handleNewUser(allUsers[index]).then(res=>{
                    setError(res)
                })
    
                await new Promise(resolve => setTimeout(resolve, 310));
    
                
                
                
            }
            setSuccess(true)
        }
        fuckingUser()

        
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              بارگذاری فایل
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} onClick={()=>setLogs([])} style={styles.remove}>
            
              حذف فایل
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>




{success ? <span className='bg-yellow-400 text-white'>با موفقیت انجام شد</span> : <span className='bg-yellow-400 text-white'>عملیات هنوز شروع نشده است</span>} 







    <div className="max-h-64 overflow-y-auto">
      {logs.map((log, index) => (
        <div
          key={index}
          className="p-4 bg-gray-200 border-b border-gray-300"
        >
          {log}
        </div>
      ))}
    </div>
  
  </>
}

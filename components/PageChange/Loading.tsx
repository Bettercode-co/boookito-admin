

const Loader:React.FC = () => {

return(

<>
<div className="flex items-center justify-center ">
    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
</div>
<div className="flex items-center justify-center ">
    <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
</div>
<div className="flex items-center justify-center ">
    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
</div>
</>
)

    
};

export default Loader;
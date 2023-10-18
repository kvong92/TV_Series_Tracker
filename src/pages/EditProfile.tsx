import React, { useState } from 'react';
import { BiSolidEdit, BiSend } from "react-icons/bi";
import EditField from '../components/EditField';

export default function EditProfile() {
    const [input, setInput] = useState("");
    const [divVisibility, setDivVisibility] = useState(false);

    const onChange = (e: any) => {
        setInput(e.target.value)
    }

    const handleOnClick = () => {
        setInput("")
        setDivVisibility(true)
    }

    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h1>
                    <div className="w-full max-w-sm mx-auto bg-stone-700 p-8 rounded-md shadow-md">
                        <EditField 
                            user={connectedUser}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}




// import React, { useState } from 'react';
// import { BiSolidEdit, BiSend } from "react-icons/bi";

// export default function EditProfile() {
//     const [input, setInput] = useState("");
//     const [divVisibility, setDivVisibility] = useState(false);

//     const onChange = (e: any) => {
//         setInput(e.target.value)
//     }

//     const handleOnClick = () => {
//         setInput("")
//         setDivVisibility(true)
//     }



//     return (
//         <div>
//             <div className="bg-gray-100">
//                 <div className="container mx-auto py-8">
//                     <h1 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h1>
//                     <div className="w-full max-w-sm mx-auto bg-stone-700 p-8 rounded-md shadow-md">
//                         {!divVisibility && (
//                             <div className='w-full max-w-sm mx-auto p-8 flex flex-row justify-between items-center'>
//                                 <p className="block text-gray-700 text-2xl font-bold text-white py-2 px-4">
//                                     NameToEdit
//                                 </p>
//                                 <BiSolidEdit
//                                     className="text-yellow-300 text-2xl hover:text-green-300 transition duration-300"
//                                     onClick={handleOnClick}
//                                 />
//                             </div>)}
//                         {divVisibility && (
//                             <div className="mb-4">
//                                 <form className="w-full max-w-sm mx-auto p-8 flex flex-row justify-between items-center">
//                                         <input className="px-3 py-2 bg-stone-700 border border-gray-300 rounded-md focus:outline-none focus:border-white text-white"
//                                             type="text" id="name" name="name" placeholder="John Doe">
//                                         </input>
//                                         <BiSend
//                                             className="text-yellow-300 text-2xl hover:text-green-300 transition duration-300"
//                                             onClick={handleOnClick}
//                                         />
//                                 </form>
//                             </div>)
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
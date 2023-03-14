import React,{useState,useEffect}from 'react';

function App() {

const [record, setRecord] = useState([]);
const [show, setShow] = useState(false);
const [modaldata, setModaldata] = useState({
  id: "",
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
});

//get data for all user
const getData = () => {
  fetch("https://jsonplaceholder.typicode.com/users/")
    .then((resposne) => resposne.json())
    .then((res) => setRecord(res));
};
 useEffect(() => {
   getData();
 }, []);

//get data user by id
const showDetail = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((resposne) => resposne.json())
    .then((res) => setModaldata(res));
};

  return (
    <div className="container mx-[auto] min-w-max ">

      {/* displays all employee data */}
      <div className="table-data-employeesmin-w-full">
       <h2 className='text-center mb-4 min-w-full text-[19px]'>Check More Records of Employees</h2>
       <table cellSpacing={10} className="min-w-max">
        <thead className='bg-[#ff3f3f38] text-[18px]'>
         <tr>
          <th>No</th>
          <th>Name</th>
          <th>Username</th>
          <th className='pl-2'>Show Details</th>
         </tr>
        </thead>
       <tbody>
       {record.map((names, index) => (
         <tr key={index}>
           <td>{names.id}</td>
           <td>{names.name}</td>
           <td>{names.username}</td>
           <td>
             <button
               onClick={() => {
                 setShow(true);
                 showDetail(names.id);
               }}
            className="hover:shadow-[0_1px_8px_1px_grey] border-red-500 border-2 border-solid"
              >
               Get Details
             </button>
           </td>
         </tr>
       ))}
      </tbody>
     </table>
     </div>

   {/* displays employee detail data according to id */}
   {/* Modal Box  */}
   {show ? (
   <div className="fixed top-0 right-0 left-0 bottom-0 z-10 w-full h-[100vh] bg-black bg-opacity-25 flex justify-center items-center">
     <div className="modal-dialog">
       <div className="modal-header">
         <button onClick={() => setShow(false)} className="float-right hover:bg-slate-200 ">
           &times;
         </button>
         <h4>Row No : {modaldata.id}</h4>
       </div>
       <div className="modal-body">
         <p>
           <b>ID:</b> {modaldata.id}
         </p>
         <p>
           <b>Name:</b> {modaldata.name}
         </p>
         <p>
           <b>Username:</b> {modaldata.username}
         </p>
         <p>
           <b>Email:</b> {modaldata.email}
         </p>
         <p>
           <b>Phone:</b> {modaldata.phone}
         </p>
         <p>
           <b>Website:</b> {modaldata.website}
         </p>
        </div>
        <div className="modal-footer">
         <button
           onClick={() => setShow(false)}
           className="bg-red-500 text-white relative float-right hover:bg-red-600"
         >
           Close
         </button>
        </div>
       </div>
      </div>
      ) : null}
    </div>
  );
}

export default App;
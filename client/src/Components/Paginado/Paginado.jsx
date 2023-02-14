import React from 'react'
import './Paginado.css'

// export default function Paginado ({gamesPerPage, allgames, paginado, currentPage, setCurrentPage, search}){
// // 
//     const pageNumbers = []

//   for(let i=1; i <= Math.ceil(allgames/gamesPerPage); i++){
//       pageNumbers.push(i)
//   }

//   return(
//       <nav className='Pag'>
//           <ul>
//           <li>
//                 <p onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>&#60;</p>
//               </li>
//               {pageNumbers && pageNumbers.map(number =>(
//                   <div key={number}>
//                   <li key={number} >
//                   <p onClick={() => paginado(number)} > {number} </p>
//                   </li>
//                   </div>
//               ))}
//                <li>
//                 <p onClick={() => currentPage < pageNumbers.length && setCurrentPage(currentPage + 1)}>&#62;</p>
//               </li>
//           </ul>
//       </nav>
//   )
// }
const PageItem = ({ number, currentPage, paginado }) => {
    return (
      <li className={number === currentPage ? "selected" : ""}>
        <p onClick={() => paginado(number)}>{number}</p>
      </li>
    );
  };
  
  export default function Paginado({
    gamesPerPage,
    allgames,
    paginado,
    currentPage,
    setCurrentPage,
    search
  }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(allgames / gamesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="Pag">
        <ul>
          <li>
            <p
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
            >
              &#60;
            </p>
          </li>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <div key={number}>
                <PageItem
                  number={number}
                  currentPage={currentPage}
                  paginado={paginado}
                />
              </div>
            ))}
          <li>
            <p
              onClick={() =>
                currentPage < pageNumbers.length &&
                setCurrentPage(currentPage + 1)
              }
            >
              &#62;
            </p>
          </li>
        </ul>
      </nav>
    );
  }
  



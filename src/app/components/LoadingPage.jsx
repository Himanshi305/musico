// "use client";
// import { useState, useEffect } from 'react';

// export default function LoadingPage() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000); // 2 seconds loading time

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-black z-[10000] flex items-center justify-center">
//         <p className="text-white text-xl">just a moment</p>
//       </div>
//     );
//   }

//   return null;
// }

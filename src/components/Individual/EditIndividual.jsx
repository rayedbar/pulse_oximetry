import React from "react";

// const useIndividualDetail = () => {
//   const { individualID } = useParams();
//   const [individualDetail, setIndividualDetail] = useState(null);

//   useEffect(() => {
//     const fetchIndividualDetail = async () => {
//       try {
//         const individualData = await API.graphql(
//           graphqlOperation(getIndividual, { id: individualID })
//         );
//         setIndividualDetail(individualData.data.getIndividual);
//       } catch {
//         // ignore
//       }
//     };
//     fetchIndividualDetail();
//   }, [individualID]);

//   return individualDetail;
// };

// const updateIndividual = async () => {
//   try {
//     await API.graphql(
//       graphqlOperation(UpdateIndividualMutation, {
//         input: {
//           ...data,
//           dob: formatDate(dob, "yyyy-MM-dd"),
//           id: individualDetail.id,
//         },
//       })
//     );
//     history.push(URL.INDIVIDUALS + "/" + individualDetail.id);
//   } catch (error) {
//     console.log("Updating Error: ", error);
//   }
// };

const EditIndividual = () => {
  return <div>Edit Individual</div>;
};

export default EditIndividual;

type PatientPageProps = {
  params: {
    id: string;
  };
};
const PatientPage = ({ params }: PatientPageProps) => {

  return params.id

};
export default PatientPage;

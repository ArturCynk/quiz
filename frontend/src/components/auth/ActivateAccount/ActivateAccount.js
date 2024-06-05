import React, {useEffect,useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { Container, Message, Title } from './styles';

const ActivateAccount = () => {
    const { token } = useParams();
    const [message,setMessage] = useState();

    useEffect(()=>{
        const activateAccount = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/activate/${token}`);
                setMessage(response.data.message);
            } catch(error) {
                console.log(error);
                setMessage(error.response.data.error|| 'Activation failed. Please try again.');
            }
        };

        activateAccount();
    },[token]);

  return (
    <Container>
        <Title>Account Activation</Title>
        {message && <Message>{message}</Message>}
    </Container>
  )
}

export default ActivateAccount

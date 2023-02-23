import React, {useState, useContext} from "react";
import { View, Text, Alert } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "./styles";
import { Platform, ActivityIndicator } from "react-native";

import {useNavigation} from '@react-navigation/native'

import { AuthContext } from "../../contexts/auth";

export default function SignIn(){

    const navigation = useNavigation();
    const {signIn, loadingAuth} =useContext(AuthContext);


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleLogin(){
        signIn(email, password);
    }

    return(
        <Background>
            <Container
                behavior={Platform.OS ==='ios' ? 'padding' : ''}
                enabled
            >
                <Logo 
                    source={require('../../assets/Logo.png')}
                />

                <AreaInput>
                    <Input
                        placeHolder="Seu email"
                        value={email}
                        onChangeText={(text)=> setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeHolder="Sua senha"
                        value={password}
                        onChangeText={(password)=> setPassword(password)}
                    />
                </AreaInput>
                
                <SubmitButton onPress = { handleLogin }>
                    {
                        loadingAuth ? <ActivityIndicator size={20} color="#FFF"/> 
                        :  <SubmitText>Acessar</SubmitText>
                    }
                   
                </SubmitButton>

                <Link onPress={()=> navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta</LinkText>
                </Link>


            </Container>
            
        </Background>
    )
}
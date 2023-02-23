import React, {useContext, useState } from 'react';
import {View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/auth';

import {Background} from './styles'
import Header from '../../components/Header'

export default function Home(){

    const { signOut, user } = useContext(AuthContext);

    return(
       <Background>   
          <Header title="Minhas Movimentações"/>
       </Background>
    )
}
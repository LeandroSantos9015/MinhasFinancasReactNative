import React, {createContext, useEffect, useState} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

// esse cara aqui funciona para todo o contexto como se fosse uma classe estática 
export const AuthContext = createContext();

function AuthProvider({children}){

    var chaveTokenStorage = '@finToken';

    const [user, setUser]= useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(()=>{
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem(chaveTokenStorage);

            var success = true;

            if(storageUser){
                const response = await api.get('/User/me',{
                    headers:{
                        'Authorization': `Bearer ${storageUser}`
                    }

                    
                })
                .catch((err)=>{
                    console.log("Cai no catch", err)
                    setUser(null);
                    setLoading(false);
                    success = false;
                })

                if(success){

                    console.log("Token Válido");
                    console.log(response.data);

                    api.defaults.headers['Authorization'] =`Bearer ${storageUser}`;   
                    setUser(response.data);
                }
                else{
                    console.log("Token inválido");
                }

            
                setLoading(false);
            
            }
            setLoading(false);
        }

        loadStorage();

    },[]);

    async function signUp(email, password, nome){
        
        setLoadingAuth(true);

        try{

            const response = await api.post('/User/save', {
                Nome: nome,
                Email: email,
                Senha: password,
                Ativo: 1

            });

            navigation.goBack();

            console.log("Cadastro Realizado com Sucesso");

        }catch(err){
            console.log("Erro ao cadastrar", err);

        }finally{
            setLoadingAuth(false);
        }


    }

    async function signIn(email, password){

        setLoadingAuth(true);

        try{
            const response = await api.post('/User/auth', {
                Nome: '',
                Email: email,
                Senha: password,
                Ativo: 0,
                Token: ''
            });
    
           
            console.log(response.data);
            const {id, nome, token} = response.data;

        const data = {
            id,
            nome,
            email,
            token
        };

        if(id){
            console.log("Logado");

            await AsyncStorage.setItem(chaveTokenStorage, token);
            api.defaults.headers['Authorization'] =`Bearer ${token}`;
    
            setUser({
               id,
               nome,
               email 
            });
    
        }
        else{
            alert("Email ou Senha estão incorretos");
        }
      
        }
        catch(err){
            console.log("Erro tentar se logar", err);
        }
        finally{
            setLoadingAuth(false);
        }
    }

    async function signOut(){
        // .then é que deu tudo certo
        await AsyncStorage.clear()
        .then(()=> {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading}}>
            {children}
        </AuthContext.Provider>


    );

}

export default AuthProvider;
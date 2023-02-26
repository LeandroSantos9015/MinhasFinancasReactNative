import styled from "styled-components";


export const Container = styled.View`
    margin-left: 14px;
    margin-right: 14px;
    border-radius: 4px;
    justify-content: center;
    align-items: flex-start;
    width: 300px;
    padding-left: 14px;
    background-color: #${props => props.bg};


`;

export const Label = styled.Text`
    color: #FFF;
    font-size: 19px;
    font-weight: bold;
`;

export const Balance = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #fff;

`;
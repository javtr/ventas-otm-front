import AxiosRequest from './config/axiosConfig';



export function GetAllProducts() {
    return AxiosRequest.get('/producto/get-all', {

    });
}


export function GetAllTipos() {
    return AxiosRequest.get('/tipo-pago/get-all', {

    });
}

export function GetAllMedios() {
    return AxiosRequest.get('/medio-pago/get-all', {

    });
}

export function PostRegistro(objeto) {
    return AxiosRequest.post('/registro/save', objeto);
}


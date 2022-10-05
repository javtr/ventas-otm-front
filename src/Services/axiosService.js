import AxiosRequest from './config/axiosConfig';


export function GetAllProducts() {
    return AxiosRequest.get('/producto/get-all', {

        // validateStatus: function (status) {
        //   return status < 500; 
        // }

    });
}

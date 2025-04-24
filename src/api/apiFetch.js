const baseUrl = 'http://localhost:8080/api';
//const baseUrl = 'https://vps-4747480-x.dattaweb.com/api';
//const baseUrl = 'https://vps25.fantasiaspjd.site/api';

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    if ( method === 'GET' ) {
        return fetch( url )        ;
    } else {
        return fetch( url, {
            method : method,
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url,{
            method : method,
            headers : {
                'x-token' : token
            },
        } );
    } else {
        return fetch( url, {
            method : method,
            headers:{
                'Content-type' : 'application/json',
                'x-token' : token
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}
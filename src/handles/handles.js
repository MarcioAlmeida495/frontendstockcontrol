

export const onSuccess = (navigate)=>{navigate('/getitens', {replace: true})}
export const onNavigate = (navigate, url) => {navigate(url, {replace: true}); console.log(`deveria ir para ${url} utilizando ${navigate}`)}
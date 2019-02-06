let imagesBuffer=[];
function loadImage(url){
    return new Promise(resolve=>{
        
        const img = new Image();
        imagesBuffer.push(img);
        img.addEventListener('load',()=>{
            console.log('image with the path : '+url+' sucsessfully loaded!',Date.now())
            //imagesBuffer.push(img);         
            resolve(img);
        });
        img.src=url;
    })
};

let load_All_Images=(arrURLs)=>{
   const promises = arrURLs.map(url=>loadImage(url))//переделал массив урлов в массив промисов
//возвращаю промис когда все промисы в виде картинок будут успешны
   return Promise.all(promises);
}

export {load_All_Images,imagesBuffer}; 
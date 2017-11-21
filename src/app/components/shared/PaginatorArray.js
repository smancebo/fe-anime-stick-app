
function PaginatorArray(arr){
    let inst = new Array().concat(arr);
    inst.__proto__ = PaginatorArray.prototype;

    return inst;
}

PaginatorArray.prototype = Object.create(Array.prototype);

PaginatorArray.prototype.paginate = function (currentPage, pageSize) {
    return this.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}

PaginatorArray.prototype.getTotalPages = function (pageSize) {
    return Math.ceil(this.length / pageSize)
}


export default PaginatorArray;
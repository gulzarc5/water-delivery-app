class Errors{
    errors = {};

    getErrors(){
        return this.errors;
    }

    setErrors(response){
        this.errors = response;
    }

    getKey(key){
        return (this.errors[key] !== undefined ? this.errors[key] : null);
    }

    reset(){
        this.errors = {};
    }
}

export default Errors;
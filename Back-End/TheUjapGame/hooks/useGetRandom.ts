// hook to get a random number
// this custom hook was created to pass a random number to mint and attack functions
export const useGetRandom = () =>{
    // function to get randomness
    const random = () =>{
        //return random number between max - min
        return Math.random() * (999999999 - 99999999) + 99999999
    }
    return { random }
}
const getId = () => (100000*Math.random()).toFixed(0)

const actionCreators = {
    noteCreation(content) {
        return{
            type: 'ADD_NOTE',
            data: { 
                content: content,
                id: getId(),
                votes: 0
            } 
        }
    },
    givingVotes(id){
        return {
            type: 'VOTE',
            data: { 
                id 
            }
        }
    },
    cancellingVotes(id){
        return {
            type: 'CANCEL_VOTE',
            data: { id }
        }
    }
}
export default actionCreators

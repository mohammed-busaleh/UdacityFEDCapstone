import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submitButton').addEventListener('click', handleSubmit);
});
export {
    handleSubmit
}

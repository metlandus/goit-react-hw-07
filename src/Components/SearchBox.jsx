import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../Redux/filtersSlice';


const SearchBox = () => {

    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.filters.nameFilter);

    const handleChange = (event) => {
        dispatch(changeFilter(event.target.value));
    };


    return (
        <div>
            <p>Find contacs by name</p>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange} />

        </div>
    );
};



export default SearchBox;
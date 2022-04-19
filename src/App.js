import './App.css';
import { useEffect, useState } from 'react';
import accs, { createAccount } from './services/accounts';
import AddAccount from './components/AddAccount'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [horses, setHorses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActive] = useState();

  async function selectAccount(id) {
    return accs.getItem(id)
  }

  useEffect(() => {
    async function fetchData() {
      const c = await accs.keys();
      setAccounts(c);
      const active = await selectAccount(c[0]);
      setActive(active)
    }
    
    fetchData()
    return () => {};
  }, [isOpen])

  useEffect(() => {
    async function fetchData() {
      const stable = await fetch(`https://api.zed.run/api/v1/horses/get_user_horses?public_address=${activeAccount.eth_address}`).then(r => r.json())
      setHorses(stable)
    }
    
    fetchData()
    return () => {};
  }, [activeAccount])


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSave(e) {
    e.preventDefault();

    const alias = e.target.alias; // accessing directly
    const ethaddress = e.target.ethaddress; // accessing via `form.elements`
    const jwt = e.target.jwt; // accessing via `form.elements`

    console.log(alias.value); // output: 'foo@bar.com'
    console.log(ethaddress.value); // output: '18'
    console.log(jwt.value); // output: '18'

    await createAccount({
      alias: alias.value,
      eth_address: ethaddress.value,
      jwt: jwt.value,
    });

    closeModal();
  }


  
  return (
    <div className="App">
      <header>
        {accounts.map((acc, i) => (<button key={i}>{acc}</button>))}
        <button onClick={openModal}>+</button>
      </header>
    
      <AddAccount isOpen={isOpen} closeModal={closeModal} onSave={onSave} />


      <div id="horses-grid">
        {horses.map(horse => (
          <div key={horse.id} class="horse">
            <img src={horse.img_url} alt={horse.id} />
            <h5>{horse.hash_info.name}</h5>
          </div>)
        )}
      </div>
      
    </div>
  );
}

export default App;

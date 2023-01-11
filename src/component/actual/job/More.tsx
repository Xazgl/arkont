import banner from '/public/images/5.jpg';



export function More({ job,setOpen }) {

   async function send(){
      setOpen(true)
   }
   return (
      <>
         <div className="background" >
            <div className='card'>
               <div className='elCard'>
                  <div className='title'>{job.title}</div>
               </div>
               <div className='elCard'>
                  <div className='title'>Требования</div>
                  <div className='descrtiption'>{job.description}</div>
               </div>
               <div className='elCard'>
               <div className='title'>Опыт работы</div>
                  <div className='descrtiption'>от {job.exp}</div>
                  </div>
               {/* <div className='elCard'>{job.carBrend}</div> */}
               <div className='elCard'>
                  <div className='title'>Место работы</div>
                  <div className='descrtiption'>Дилерский центр {job.office}</div>
               </div>
               <div className='elCard'>
                  <div className='title'>Заработная плата от {job.salary}</div>
               </div>
               <div className='elCard'>
                  <button onClick={send}>Откликнуться</button>
                  </div>
            </div>
         </div>

         <style jsx>{`
                 .background {
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 500px;
                    align-items: center;
                    margin-top:50px;
                 }

                 .card {
                  display: flex;
                  justify-content: center;
                  width: 900px;
                  height: auto;
                  flex-direction: column;
                  align-items: center;
                  text-align: start;
                 }

                 .elCard {
                  width: 100%;
                  font-size: 20px;
                  font-family: 'TacticSans-Reg','sans-serif'; 
                  flex-direction: column;
                  margin-top:10px;
                 }

                 .title {
                  font-weight: bold;
                  font-size: 20px;
                  margin-top:5px;
                 }

                 .descrtiption {
                  font-size: 18px;
                  margin-top:5px;
                 }

                 button{
                  margin-top:40px;
                  width: 300px;
                  height: 45px;
                  font-size: 16px;
                  color: #fff;
                  background-color: #005baa;
                  border-color: transparent;
                  border-radius: 7px;
                  border: solid 1px transparent;
                  font-weight: 600;
                  transition: 0.3s;
                 }

                 button:hover{
                  background:transparent;
                  border: solid 1px #005baa;
                  color:#005baa;
                  transform: scale(0.99);
                 }
                 
            `}</style>
      </>
   )
}
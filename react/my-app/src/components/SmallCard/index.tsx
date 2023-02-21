import styles from "./smallCard.module.scss";


interface ISmallCardProps {
  date: string;
  title: string;
  description: string;
  src: string;
  rating: number | any;
  id: string;
}

const SmallCard: React.FC<ISmallCardProps> = (props) => {
  return (
    <>
      <div className="wrap_hidden">
        <div className={styles.card_img}>
          <img src={props.src} alt={"src"} />
        </div>
        <div className="picture_hover"></div>
      </div>
      <div
        
        className={styles.card_content}
      >
        <span
          
          className={styles.card_dateDay}
        >
          {props.date}
        </span>
        <h3
  
          className={styles.card_title}
        >
          {props.title}
        </h3>
      </div>
    </>
  );
};

export default SmallCard;

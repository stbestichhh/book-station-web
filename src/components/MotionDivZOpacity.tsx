import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionDivZOpacity = ({
  children,
  delay,
  classes,
}: {
  children: ReactNode;
  delay?: number;
  classes?: string;
}) => {
  return (
    <motion.div
      className={classes ?? 'd-inline-block'}
      initial={{ opacity: 0, z: 10 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -10 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  );
};
export default MotionDivZOpacity;

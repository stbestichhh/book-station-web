import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionDivZOpacity = ({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      className={`d-inline-block`}
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

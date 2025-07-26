import React, { useState, useEffect } from "react";
import colors from "../styles/colors";

const TodoItem = ({item, index, deleteTask, completeTask}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); 
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.white,
    border: `1px solid ${colors.black}`,
    borderTop: index === 1 ? `1px solid ${colors.black}` : 'none',
    padding: '0px',
    minHeight: '60px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const indexStyle = {
    backgroundColor: colors.black,
    color: colors.white,
    width: isMobile ? '60px' : '80px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  };

  const checkboxContainerStyle = {
    padding: isMobile ? '0 12px' : '0 20px',
    display: 'flex',
    alignItems: 'center'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    border: `2px solid ${colors.black}`,
    backgroundColor: item.isComplete ? colors.black : colors.white,
    cursor: 'pointer',
    position: 'relative',
    marginRight: '0px'
  };

  const taskContentStyle = {
    flex: 1,
    fontSize: '16px',
    fontWeight: '500',
    color: item.isComplete ? colors.mediumGray : colors.black,
    textDecoration: item.isComplete ? 'line-through' : 'none',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: isMobile ? '0 12px' : '0 20px',
    wordBreak: 'break-word',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.2'
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: '10px',
    padding: isMobile ? '0 12px' : '0 20px',
    opacity: isMobile ? 1 : 0, 
    transition: 'opacity 0.2s ease'
  };

  const deleteButtonStyle = {
    backgroundColor: colors.transparent,
    border: `1px solid ${colors.black}`,
    color: colors.black,
    padding: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1'
  };

  return (
    <div 
      style={itemStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.lightGray;
        e.currentTarget.querySelector('.action-buttons').style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.white;
        e.currentTarget.querySelector('.action-buttons').style.opacity = '0';
      }}
    >
      <div style={indexStyle}>
        {String(index).padStart(2, '0')}
      </div>
      
      <div style={checkboxContainerStyle}>
        <div 
          style={checkboxStyle}
          onClick={() => completeTask(item._id)}
        >
          {item.isComplete && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: colors.white,
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ✓
            </div>
          )}
        </div>
      </div>

      <div style={taskContentStyle}>
        {item.task}
      </div>

      <div 
        className="action-buttons"
        style={actionButtonsStyle}
      >
        <button 
          style={deleteButtonStyle}
          onClick={() => deleteTask(item._id)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.deleteHover;
            e.target.style.color = colors.white;
            e.target.style.borderColor = colors.deleteHover;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.transparent;
            e.target.style.color = colors.black;
            e.target.style.borderColor = colors.black;
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
